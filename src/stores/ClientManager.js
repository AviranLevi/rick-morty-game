import { observable, action } from 'mobx'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3004/')

class ClientManager {
    @observable gameID
    @observable playerID
    @observable gameData
    @observable checKeyPress = [40, 38, 37, 39]
    @observable multiPlayer = false
    @observable gameOver = false

    @action getGameIdAndPlayerID(gameIDAndPlayer) {
        this.gameID = gameIDAndPlayer.gameId
        this.playerID = gameIDAndPlayer.playerId
    }

    @action startGame = () => {
        socket.emit('startGame', this.gameID)
    }


    @action newState = () => {
        socket.on('newState', (gameData) => {
            this.getgameData(gameData)
        })
    }

    @action startsingleGame = () => {
        socket.on('joinedGame', (gameIDAndPlayer) => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)
            socket.emit('startGame', gameIDAndPlayer.gameId)
        })

    }

    @action gameCreated = () => {
        socket.on('joinedGame', (gameIDAndPlayer) => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)
            console.log(gameIDAndPlayer.gameId)
        })
    }

    @action newGame = () => {
        this.gameOver = false
        socket.emit('newGame')
        socket.on('joinedGame', gameIDAndPlayer => {
            this.gameID = gameIDAndPlayer.gameId
            // this.gameID = gameIDAndPlayer.gameId
        })
    }


    @action joinGame = (gameJoinID) => {
        socket.emit('joinGame', gameJoinID)
        socket.on('joinedGame', (gameIDAndPlayer) => {
            this.getGameIdAndPlayerID(gameIDAndPlayer)

        })
    }

    @action getgameData = (gameData) => {
        this.gameData = { ...gameData }
    }

    @action move = (direction) => {
        socket.emit('move', this.gameID, this.playerID, direction)
    }

    @action shoot = () => {
        socket.emit('shoot', this.gameID, this.playerID)
    }

    @action pauseGame = () => {
        socket.emit('pauseGame', this.gameID)
    }

    @action continueGame = () => {
        socket.emit('continueGame', this.gameID)
    }
    @action setGameOver = () => {
        this.gameOver = true
    }

}

const clientManager = new ClientManager()
if (clientManager.gameData) {
    clientManager.newState()
}


socket.on('gameOver', () => {
    clientManager.setGameOver()
})
export default clientManager