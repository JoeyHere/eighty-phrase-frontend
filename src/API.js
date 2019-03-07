//------- Handle API Errors and Server Failiure  ------//
const handleError = errorObj => {
    let error = containsError(errorObj) ? errorObj : { error: 'oops something went wrong' }
    alert(`i hit the error code with the error ${error.error}`)
}
const containsError = data => ('error' in data)
const handleApiResponse = data => {
    if (containsError(data)) {
        return Promise.reject(data)
    }
    return data
}

//------ All API requests are made by this class ------//
class API {
    static init() {
        this.baseURL = 'http://10.218.3.182:3000/api/v1'
        this.roomURL = this.baseURL + `/rooms`
        this.userURL = this.baseURL + `/users`
        this.roundURL = this.baseURL + `/rounds`
        this.respURL = this.baseURL + `/responses`
    }

    static createNewRoom = () => {
        return fetch(this.roomURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static getRoomById = roomId => {
        return fetch(`${this.roomURL}/${roomId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static joinRoom = (name, roomCode) => {
        return fetch(this.userURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'code': roomCode
            })
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static updateRoom = room => {
        return fetch(`${this.roomURL}/${room.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(room)
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static createNewRound = roomId => {
        return fetch(this.roundURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'room_id': roomId })
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static updateRound = round => {
        return fetch(`${this.roundURL}/${round.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(round)
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static getRound = round => {
        fetch(`${this.roundURL}/${round.id}`)
            .then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static deleteUser = user => {
        return fetch(`${this.userURL}/${user.id}`, { method: 'DELETE' })
            .then(res => res.json()).then(handleApiResponse).catch(handleError)
    }

    static createResponse = response => {
        return fetch(`${this.respURL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }).then(res => res.json()).then(handleApiResponse).catch(handleError)
    }
}

API.init()