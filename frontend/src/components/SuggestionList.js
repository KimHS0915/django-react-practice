import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import useAxios from 'axios-hooks';
import { useAppContext } from 'store';
import './SuggestionList.scss';

export default function SuggestionList({ style }) {
    const { store: { jwtToken }} = useAppContext();

    const headers = { Authorization: `JWT ${jwtToken}` };
    
    const apiUrl = "http://localhost:8000/accounts/suggestions/";

    const [{ data: userList, loading, error }, refetch] = useAxios({
        url: apiUrl,
        headers,
    });


    return (
        <div style={style}>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}

            <button onClick={() => refetch()}>Reload</button>
            
            <Card title="Suggestions for you" size="small">
                {userList &&
                    userList.map(suggestionUser => (
                        <Suggestion 
                            key={suggestionUser.username}
                            suggestionUser={suggestionUser} 
                        />
                    ))}
            </Card>            
        </div>
    );
}
