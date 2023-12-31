import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "./CardList";

export default function Study() {
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    
    useEffect (() => {
        async function getDeck() {
            const response = await readDeck(deckId)
            setDeck(() => response);
        }
        getDeck()
    }, [deckId])
 

    if (Object.keys(deck).length) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                <div>
                    <h1>Study: {deck.name}</h1>
                </div>
                <CardList cards={deck.cards}/>
            </div>
        )
    } else {
        return null;
    }
}