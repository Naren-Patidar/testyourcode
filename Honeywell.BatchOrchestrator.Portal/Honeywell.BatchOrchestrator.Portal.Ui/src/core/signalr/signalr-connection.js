import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SIGNALR_URL } from 'utils/Settings';

function SignalRConnection() {
  const connectionId = 0;
  // Builds the SignalR connection, mapping it to /chat
  const hubConnection = new HubConnectionBuilder()
    .withUrl(`${SIGNALR_URL}notify`) // , {skipNegotiation: true, transport: signalR.HttpTransportType.WebSocket})
    .configureLogging(LogLevel.Information)
    .build();
  console.log(hubConnection);
  // Starts the SignalR connection
  hubConnection
    .start({ withCredentials: true })
    .then((a) => {
      // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
      console.info('SignalR Connected');
      if (hubConnection.connectionId) {
        // hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
        console.log(hubConnection.connectionId);
      }
    })
    .catch((err) => console.error('SignalR Connection Error: ', err));

  const onNotifReceived = (res) => {
    console.info('just received a notification!!!', res);
  };
  hubConnection.on('SendNotification', onNotifReceived);
}

export default SignalRConnection;
