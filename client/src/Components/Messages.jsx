import React from 'react';

 const Messages = (props) => {

      if(props.user){
		return(
           <div className="msg left-msg">

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">{props.user}</div>
          <div className="msg-info-time">{props.date}</div>
        </div>

        <div className="msg-text">
          {props.message}
        </div>
      </div>
    </div>
		)
	  }

	  else{
       return(
		
         <div className="msg right-msg">

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">You</div>
          <div className="msg-info-time">{props.date}</div>
        </div>

        <div className="">
          {props.message}
        </div>
      </div>
    </div>
		
	   )
	  }

		
}

export default Messages;
