import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';

export default function BrowseCharacters() {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const publicKey = '1048eba09bf1439030cbb22e58cf28a1';
    const hash = '3f97cb072c6c68aa83ec263283955534'; // ts + privateKey + publicKey
    const apiURL = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`;

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(apiURL);
                setCharacters(response.data.data.results);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchCharacters();
    }, [apiURL]);

    const handleCharacterClick = (id) => {
        setSelectedCharacterId(id);
    };

    const handleCloseDetail = () => {
        setSelectedCharacterId(null);
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            {selectedCharacterId ? (
                <CharacterDetail
                    characterId={selectedCharacterId}
                    onClose={handleCloseDetail}
                />
            ) : (
                <div className="character-grid">
                    {characters.map(character => (
                        <div 
                            key={character.id} 
                            className="character-card"
                            onClick={() => handleCharacterClick(character.id)}
                        >
                            <h2>{character.name}</h2>
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}