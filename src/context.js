import React, { Component } from 'react'
import {items} from './data'
const RoomContext= React.createContext();

//<RoomContext.Provider value={}

export default class RoomProvider extends Component {

    state={
        rooms:[],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };
    //getData

    componentDidMount(){
        let rooms = this.formatData(items) //todos formateados
        let featuredRooms = rooms.filter(room=>room.featured===true) //solos los destacados
        //recorremos los cuartos para saber cual es el maximo
        let maxPrice = Math.max(...rooms.map(item=>
            item.price));
        //recorremos los cuartos para saber cual es el tamaño maximo de hab
        let maxSize = Math.max(...rooms.map(item=>
            item.size));
        this.setState({
            rooms, 
            sortedRooms: rooms, 
            featuredRooms, 
            loading: false,
            price:maxPrice,
            maxPrice: maxPrice,
            maxSize: maxSize
        })
    }

    formatData (items){
        let tempItems = items.map(item =>{
            let id=item.sys.id
            let images= item.fields.images.map(image =>image.fields.file.url)

            let room =  {...item.fields,images,id}
            return room;
        })
        return tempItems
    }

    getRoom= (slug) => { 
        let tempRooms= [...this.state.rooms]; //los cuartos que tengo en memoria
        const room= tempRooms.find((room)=>room.slug===slug);

        return room;
    }

    handleChange = event => {
        const target= event.target
        const value= target.type === "checkbox"? target.checked: target.value
        const name= event.target.name

        this.setState({
            [name]:value
        }, this.filterRooms)
    }

    filterRooms = ()=>{
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        }= this.state;
        //temporal , primero con todos
        let tempRooms= [...rooms]
        //transformamos las variables porque si no las toman como string
        capacity=parseInt(capacity); 
        price=parseInt(price);
        //agregamos filtro de tipos
        if (type!=='all'){
            tempRooms= tempRooms.filter(room => room.type===type)
        }
        //filtramos por capacidad
        if (capacity!==1){
            tempRooms= tempRooms.filter(room => parseInt(room.capacity)>=capacity)
        }

        //filtramos por precio maximo
        tempRooms= tempRooms.filter(room => parseInt(room.price)<=price)

        //filtramos por tamaño
        tempRooms= tempRooms.filter(room => room.size>=minSize && room.size<=maxSize)

        //filtramos por breakfast
        console.log(breakfast)
        if (breakfast){
            tempRooms= tempRooms.filter(room => room.breakfast===true)
        }
        //filtramos por pets
        if (pets){
            tempRooms= tempRooms.filter(room => room.pets===true)
        }

        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value= {{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider> 
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component{...props} context={value}/>} 
        </RoomConsumer> 
    }
}

export {RoomProvider, RoomConsumer, RoomContext}

