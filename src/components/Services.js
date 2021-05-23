import React, { useState } from 'react'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'
import {Title} from './Title'

export const Services = () => {

    const initialState={
        services:[{
            icon: <FaCocktail/>,
            title:"Free Cocktails",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },{
            icon: <FaHiking/>,
            title:"Endless Hiking",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },{
            icon: <FaShuttleVan/>,
            title:"Free Shuttle",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },{
            icon: <FaBeer/>,
            title:"Strongest Beer",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ]}
    
    
    //const [state, setState] = useState(initialState)
    const [state] = useState(initialState)
    

    return (
        <section className="services">
            <Title title="services"/>
            <div className="services-center">
                {state.services.map((item,index) =>{
                    return <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                })}
            </div>
        </section>
    )
}
