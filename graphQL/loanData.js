import { useQuery } from '@apollo/client';
import React from 'react';
import LOAN_QUERY from './loanQuery';

const LoanData = () => {
    const { loading, error, data} = useQuery(LOAN_QUERY);

    if (loading)
        return (
            <p>Loading.....</p>
        
        )
    if (error)
        return (
            <p>Error, Please Try another Search </p>
        )
    
    return (
        <div>{data.lend.loans.values.map(({image, name, loanAmount} ) => (
            <p>
                {image}
                Name {name}:
                $ {loanAmount}
                
            </p>    
        ))
        }            
            
        </div>
    )
}

export default LoanData;