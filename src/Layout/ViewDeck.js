import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

export default function ViewDeck() {
    const history = useHistory();
    const { deckId } = useParams();

    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function getDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
            setCards(response.cards);
        }
        getDeck();
    }, [deckId]);


    async function handleDeleteDeck(deck) {
        if (window.confirm("Delete this deck? You will not be able to recover it once deleted.")){
            await deleteDeck(deck.id);
            history.push("/");
        } else {
            history.go();
        }
    }

    async function handleDeleteCard(card) {
        if (window.confirm("Delete this card? You will not be able to recover it once deleted.")){
            await deleteCard(card.id);
            history.go();
        } else {
            history.go();
        }
    }

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleEditCard(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    

    if(!deck || !cards) {
        return null;
    } else {
        return (
            <div className="col-9 mx-auto">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">{deck.name}</li>
                </ol>
              </nav>
              <div className="card border-0 mb-4">
                <div className="card-body">
                  <div className="row px-3">
                    <h5 className="card-title">{deck.name}</h5>
                  </div>
                  <p className="card-text">{deck.description}</p>
                  <div className="row px-3">
                    <button className="btn btn-secondary" onClick={() => handleEditDeck()}>
                      Edit
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => handleStudy()}>
                      Study
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => handleAddCard()}>
                      Add Cards
                    </button>
                    <button onClick={() => handleDeleteDeck(deck)} className="btn btn-danger ml-auto">
                     Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="row pl-3 pb-2">
                <h1>Cards</h1>
              </div>
              {cards.map((card, index) => (
                <div className="row" key={index}>
                  <div className="col">
                    <div className="card">
                      <div className="row card-body">
                        <p className="col-6 card-text">{card.front}</p>
                        <p className="col-6 card-text">{card.back}</p>
                      </div>
                      <div className="d-flex justify-content-end p-2">
                        <button onClick={() => handleEditCard(card)} className="btn btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCard(card)} className="btn btn-danger ml-2">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              )
          }
      }