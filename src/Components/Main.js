import React, {Component} from 'react'
import Input from './Input'
import firebase from 'firebase'
import firebaseConfig from './../firebase'


class Main extends Component{
    constructor(props){
        super(props)
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        this.state = {
            users: [],
            result: [],
            today: []
        }
    }
    componentDidMount() {
        this.getDataOnMount()
        this.getData()
    }
    
    // Get all the users in the database

    getDataOnMount = () => {
        let result = [];
        firebase.database().ref('users/').once('value', (snapshot)=> {
            Object.keys(snapshot.val()).forEach(key => {
                let item = snapshot.val()[key]
                result.push(item);
            })
            this.setState({users: result})
        })
    }
    
    // Store the user after he/she searches for name

    registerData = (data) => {
        let today = new Date()
        data.time = `${today.getHours()} : ${today.getMinutes()}` 
        let visitor = []
        visitor.push(data)
        this.setState({today: visitor})
        console.log(data)

        firebase.database().ref('todayList').push(data)
       .then(data => {
           this.getData()
       }).catch(err => console.log(err))

    }

    // Get all registered users for that day
    
    getData = () => {
        let result = [];
        firebase.database().ref('todayList/').once('value', (snapshot)=> {
            if(snapshot.val()){
                Object.keys(snapshot.val()).forEach(key => {
                    let item = snapshot.val()[key]
                    result.push(item);
                })
                this.setState({today: result})
            }
        })
    }

    
    // get the value of the search input
    
    handleChange = (e) => {
        let search = e.target.value
        if(search.length > 3){
            const allUsers = this.state.users
            const searchData = allUsers.filter((data)=> {
                return data.first_name.includes(search)
            })
            this.setState({result: searchData})
        }
    }

    render(){
        const dropList = this.state.result
        const dropData = dropList.map((data, index) => (
            <li key={index} onClick={() => this.registerData(data)}>{data.first_name} {data.last_name} <small><i>({data.email})</i></small></li>
        ))

        const todayList = this.state.today.map((data, index) => (
            <li key={index}>{data.first_name} {data.last_name} <small><strong>{data.time}</strong></small></li>
        ))

        return (
            <div>
                <div className="main">
                    <div className="row">
                        <div className="col-md-6">
                            <Input onChange={this.handleChange} name="search" inputType="text" inputPlaceholder="Search for first name" value={this.state.search} className="form-control"/>
                            <div className="dropdown-box">
                                <ul>
                                    {dropData}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 register-container">
                            <h4>Register</h4>
                            <ul>
                                {todayList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
