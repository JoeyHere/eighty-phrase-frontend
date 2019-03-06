class API {
    static init() {
        this.baseURL = 'http://10.218.6.158:3000/api/v1'
        this.roomURL = this.baseURL + `/rooms`
        this.userURL = this.baseURL + `/users`
        this.roundURL = this.baseURL + `/rounds`
    }

    static createNewRoom = () => {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }}
        return fetch(this.roomURL, options)
            .then(res => res.json())
    }

    static getRoomById = roomId => {
        return fetch(`${this.roomURL}/${roomId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
    }

    static joinRoom = (name, roomCode) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'code': roomCode
                })
        }
        return fetch(this.userURL, options)
            .then(res => res.json())
    }

    static updateRoom = room => {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(room)
        }
        return fetch(`${this.roomURL}/${room.id}`, options)
            .then(res => res.json())
    }

    static createNewRound = roomId => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'room_id': roomId})
        }
        return fetch(this.roundURL, options)
            .then(res => res.json())
    }

    static getRound = round => {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},}
        return fetch(`${this.roundURL}/${round.id}`, options)
            .then(res => res.json())
    }

    static createNewEvent = (round, content) => {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      round_id: round.id,
                      content: content
                  })
              }
              return fetch(this.eventURL, options)
                  .then(res => res.json())
    }

    static deleteUser = user => {
        const options = {method: 'DELETE'}
        return fetch(`${this.userURL}/${user.id}`, options)
            .then(res => res.json())
    }
}

API.init()