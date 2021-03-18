import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Socket} from "socket.io";

@WebSocketGateway({namespace: 'sockets'})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server;
    connectedSockets: Socket[] = [];

    @SubscribeMessage('chatmessage')
    async onChatMessage(client, data: any) {
        const event = 'chatmessage';
        this.server.emit(event, data[0]);
    }

    @SubscribeMessage('offerConnectionToUser')
    async onOfferConnectionToUser(client, data: any) {
        this.server.emit('connectionOffer', data[0]);
    }

    @SubscribeMessage('connectionOfferConfirmed')
    async onConnectionOfferConfirmed(client, data: any) {
        this.server.emit('connectionOfferConfirmed', data[0]);
    }

    @SubscribeMessage('candidateFound')
    async onCandidateFound(client, data: any) {
        this.server.emit('candidateFound', data[0]);
    }

    @SubscribeMessage('webRtcDisconnected')
    async onWebRtcDisconnected(client, data: any) {
        this.server.emit('webRtcDisconnected');
    }

    handleConnection(socket: Socket) {
        this.connectedSockets.push(socket);
    }
    handleDisconnect(socket: Socket) {
        this.connectedSockets = this.connectedSockets.filter(x => x !== socket);
    }

}