import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
        return (
        <div className="customer">
            <h3 className="customer__name">{props.name}</h3>
            <p className="customer__details">Customer since {props.registeredAt.slice(0, 4)}</p>
            <p className="customer__details">Videos currently rented: {props.videosCheckedOutCount}</p>
            {/* TODO wtf does "account_credit" mean? these folks all carrying positive balances at Hollywood Video? */}
            <p className="customer__details">Account Credit: {props.accountCredit}</p>
            <p className="customer__details">{props.phone}</p>
            <p className="customer__details">{props.address}</p>
            <p className="customer__details">{props.city}, {props.state} {props.postalCode}</p>
        </div>
    )
}

Customer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    registeredAt: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    phone: PropTypes.string,
    accountCredit: PropTypes.number,
    videosCheckedOutCount: PropTypes.number,
}

export default Customer;