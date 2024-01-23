import React from 'react'

const OfflineMessage = ({NoInternet}) => {
  return (
    <div>
           <div
        data-testid="statusMessageOffline"
        className="d-flex   flex-column  justify-content-center align-items-center p-5"
      >
        <img src={NoInternet} alt="NoInternet" />

        <h4 className="text-capitalize"> Opps! you are offline</h4>
      </div>
      
    </div>
  )
}

export default OfflineMessage
