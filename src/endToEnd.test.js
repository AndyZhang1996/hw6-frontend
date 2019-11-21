import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from 'enzyme'
import jsdom from 'jsdom'
import Adapter from 'enzyme-adapter-react-16'
import Login from './components/Landing/Login'
import Registration from './components/Landing/Registration'
import Main from './components/Main/Main'
import User from './components/Main/User'

Enzyme.configure({ adapter: new Adapter() })

// let data
// let wrapper = shallow(<Login />);
// async function fetchItems() {
//     console.log("in fetch items in test!!!!!!!!!!!!")
//     const returned = await fetch(
//         'https://jsonplaceholder.typicode.com/users'
//     );
//     const items = await returned.json()
//     return items
// }

// const data = fetchItems()
// console.log(data)

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('This is an end to end test', () => {
    it('should register a new user', async () => {
        let wrapper = shallow(<Registration />)
        const instance = wrapper.instance()
        console.log(instance)
        console.log(wrapper.state())

        wrapper.find('input[name="accountName"]').simulate('change', { target: { name: 'accountName', value: "realUser" } })
        wrapper.find('input[name="emailAddress"]').simulate('change', { target: { name: 'emailAddress', value: "realuser@rice.edu" } })
        wrapper.find('input[name="phoneNumber"]').simulate('change', { target: { name: 'phoneNumber', value: "8582608580" } })
        wrapper.find('input[name="dob"]').simulate('change', { target: { name: 'dob', value: "1996-10-19" } })
        wrapper.find('input[name="zipCode"]').simulate('change', { target: { name: 'zipCode', value: "77005" } })
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: "123" } })
        wrapper.find('input[name="passwordConfrm"]').simulate('change', { target: { name: 'passwordConfrm', value: "123" } })
        wrapper.state().ageValid = true
        wrapper.state().passwordValid = true
        instance.addNewUser()

        await timeout(1000)
        expect(wrapper.state().redirectMain).toBe(true)
    })






    it('should log in previously registered user', async () => {
        let wrapper = shallow(<Login />)
        const instance = wrapper.instance()
        console.log(instance)
        console.log(wrapper.state())

        wrapper.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: "realUser" } })
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: "123" } })
        wrapper.find('button').simulate('click')
        await timeout(1000)
        // console.log(wrapper.state())


        console.log(wrapper.state())
        // instance.login()
        expect(wrapper.state().redirectMain).toBe(true)
        // done()
    })


    it('should create a new article', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()

        wrapper.find('textarea[name="newPost"]').simulate('change', { target: { name: 'newPost', value: "this is a new post for realUser" } })
        await instance.addPost()
        await timeout(1000)
        expect(wrapper.state().userPosts[0].body).toBe("this is a new post for realUser")
    })

    it('should update the status', async () => {
        let wrapper = shallow(<User />)
        const instance = wrapper.instance()

        wrapper.find('input[name="newStatus"]').simulate('change', { target: { name: 'newStatus', value: "new status" } })
        expect(wrapper.state().newStatus).toBe("new status")
    })



    it('should log out realUser', async () => {
        let wrapper = shallow(<User />)
        const instance = wrapper.instance()

        
        await instance.handleLogout()
        await timeout(1000)
        expect(wrapper.state().redirectLogin).toBe(true)
    })


    it('should log in previously registered user', async () => {
        let wrapper = shallow(<Login />)
        const instance = wrapper.instance()
        console.log(instance)
        console.log(wrapper.state())

        wrapper.find('input[name="userName"]').simulate('change', { target: { name: 'userName', value: "xz75" } })
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: "123" } })
        wrapper.find('button').simulate('click')
        await timeout(1000)
        // console.log(wrapper.state())


        console.log(wrapper.state())
        // instance.login()
        expect(wrapper.state().redirectMain).toBe(true)
        // done()
    })


    it('should search for one article for xz75', async () => {
        let wrapper = shallow(<Main />)
        const instance = wrapper.instance()

        wrapper.state().searchPost = "This is the first post"

        // wrapper.find('input[name="search"]').simulate('change', { target: { name: 'search', value: "This is the first post" } })
        instance.filterPost()
        await timeout(1000)
        // expect(wrapper.state().userPosts[0].body).toBe("this is a new post for realUser")
    })

    it('should log out xz75', async () => {
        let wrapper = shallow(<User />)
        const instance = wrapper.instance()

        
        await instance.handleLogout()
        await timeout(1000)
        expect(wrapper.state().redirectLogin).toBe(true)
    })

    
})

