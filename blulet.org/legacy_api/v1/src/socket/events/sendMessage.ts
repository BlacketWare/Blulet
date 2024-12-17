import Message from "../../schema/Message";
import User from "../../schema/User";
import Room from "../../schema/Room";
import WebSocket from "ws"

export default {
    name: "send-message",
    execute: async (ws: WebSocket, data: any, clients: Record<string, WebSocket>, userId: string) => {
        if (!data.content) return ws.send(JSON.stringify({ status: 400, error: "You must provide a message." }));
        if (!data.room) return ws.send(JSON.stringify({ status: 400, error: "You must provide a room." }));
        if (!data.content.length) return ws.send(JSON.stringify({ status: 400, error: "Your message cannot be empty." }));
        if (data.content.length > 2000) return ws.send(JSON.stringify({ status: 400, error: "Your message cannot be longer than 2000 characters." }));
        const room = await Room.findOne({ uid: data.room });
        if (!room) return ws.send(JSON.stringify({ status: 400, error: "Invalid room." }));
        if (!room.access.includes(userId) && !room.access.includes("public")) return ws.send(JSON.stringify({ status: 403, error: "You do not have permission to send messages in this room." }));

        const me = await User.findById(userId);
        if (!me) return ws.send(JSON.stringify({ status: 401, error: "You must be logged in to do this." }));
        if (me.mute.muted) return ws.send(JSON.stringify({ status: 403, error: `You are currently muted for ${me.mute.reason}. This mute will expire on ${new Date(me.mute.until).toLocaleString()}.` }));
        const mentionIds = data.content.match(/<@([0-9a-fA-F]+)>/g)?.map(mention => mention.replace(/^<@([0-9a-fA-F]+)>$/, "$1")) || [];
        const mentions = (await Promise.all(mentionIds.map(id => User.findById(id)))).filter(Boolean).map(user => ({ id: user._id, username: user.username, avatar: user.avatar, banner: user.banner, color: user.color, role: user.role, badges: user.badges }));
        const content = data.content.replace(/<@([0-9a-fA-F]+)>/g, "@$1");
        const message = new Message({ content, author: userId, room: data.room, mentions, edits: [], deleted: false });
        me.stats.messages += 1;
        me.markModified("stats");
        me.save();
        message.save();

        for (const client of Object.values(clients)) client.send(JSON.stringify({ event: "message-received", message: { id: message._id, content: message.content, author: { id: me._id, username: me.username, avatar: me.avatar, banner: me.banner, color: me.color, role: me.role, badges: me.badges }, room: message.room, mentions: message.mentions, createdAt: message.createdAt } }));
    }
};