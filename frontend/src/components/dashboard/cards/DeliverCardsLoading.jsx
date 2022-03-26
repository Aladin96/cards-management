import React from 'react';
import Skeleton from 'react-loading-skeleton';


// Layout
import Card from '../../layout/utilities/card/Card';
import CardBody from '../../layout/utilities/card/CardBody';
import MainContent from '../../layout/utilities/MainContent';
import MainContentInner from '../../layout/utilities/MainContentInner';
import PageContainer from '../../layout/utilities/PageContainer';
import Col from '../../layout/utilities/Col';

const DeliverCardsLoading = () => {
    return ( <CardBody>

                <Skeleton count={7}/>                
        
            </CardBody> );
}
 
export default DeliverCardsLoading;