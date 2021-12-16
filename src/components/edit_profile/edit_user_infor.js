
import React from 'react';
import Validate_edit from './edit_validate';
import Handle_edit_user_infor from './edit_hande';
import './Form.css'



const  User_edit = () => {

                const { handleChange, handlechangeinform,handlechangerole, handlechangepass,State, error_message,pass  } = Handle_edit_user_infor (Validate_edit);
                // const user2_Ed = storage.getUser();
                // if (!user2_Ed){user2_Ed=""}
                return ( 
                        <div className = "form-content" >
                        <form onSubmit = { handlechangeinform } className = 'form-container'  noValidate >
                        {/* <p> Username: {user2_Ed.username}  </p> */}
                        <h1> CHANGE INFORMATION </h1> 
                        <div className = 'form-inputs' >
                                <label className = 'label-form' > <b> Fullname </b></label > < br/>
                                < input type = "text"  name = 'fullname' value = { State.fullname }  onChange = { handleChange } placeholder = 'Enter your fullname' /> <br/> 
                                {error_message.fullname && <p> { error_message.fullname } </p>}  
                        </div >  
                        <div className = 'form-inputs' >
                            < label className = 'label-form' > <b> Phone </b>  </label > <br/>
                            <input type = "text" name = 'phone' value = { State.phone } onChange = { handleChange } placeholder = 'Enter your phone' /> <br/> 
                            {error_message.phone && <p> { error_message.phone } </p>}  
                        </div >  
                        <div className = 'form-inputs' >
                                <label className = 'label-form' > <b> Email </b>  </label > <br/>
                                    <input type = "email" name = 'email' value = { State.email } onChange = { handleChange } placeholder = 'Enter your email' /> <br/> 
                                    {error_message.email && <p> { error_message.email } </p>}  
                        </div> 
                        <div className = 'form-inputs' >
                                <label className = 'label-form' > <b> Picture: </b> </label > <br/>
                                 <input name = 'picture' value = { State.picture }  onChange = { handleChange }  placeholder = 'Paste link your picture' /> <br/>
                                  {error_message.picture && <p> { error_message.picture } </p> }  
                        </div> 
                        <div className = 'form-inputs' >
                        <button className = 'form-input-button' type = 'submit' > Submit </button> <br/>
                        {pass.info&& <p  > { pass.info} </p>}   
                        </div >
                        
                        </form>

                        <form onSubmit = { handlechangepass } className = 'form-container'  noValidate >
                        <h1> CHANGE PASSWORD </h1> 
                        < div className = 'form-inputs' >
                                <label className = 'label-form' > <b> Current Password </b>  </label > <br/>
                                <input type = "password" name = 'currentPassword'  value = { State.currentPassword}  onChange = { handleChange } placeholder = 'Enter your password' /> <br/> 
                                {error_message.currentPassword && <p> { error_message.currentPassword } </p>}   
                        </div >  
                        <div className = 'form-inputs' >
                                <label className = 'label-form' > <b> New Password </b>   </label > < br/>
                                <input type = "password" name = 'newPassword' value = { State.newPassword } onChange = { handleChange }  placeholder = 'Enter your confirmpassword' /> <br/> 
                                {error_message.newPassword && <p> { error_message.newPassword } </p> }  
                        </div >  
                        <div className = 'form-inputs' >
                        <button className = 'form-input-button' type = 'submit' > Submit </button> <br/>
                        {pass.error && <p  > { pass.error} </p>}   
                        </div >
                        </form>
                        
                        <form onSubmit = { handlechangerole } className = 'form-container'  noValidate >
                        <h1> CHANGE ROLE </h1>
                       
                        <div className = 'form-inputs' >
                                <label className = 'label-form' > <b> Are you a teacher?  </b>   </label > < br/>
                        </div >  
                        <div className = 'form-inputs' >
                        <button className = 'form-input-button' type = 'submit' > Yes </button> <br/>
                        {pass.role && <p  > { pass.role} </p>}   
                        </div >  
                        </form>
            
        
                                                    { /* ./Form_login.js */ } 
        
                        </div>
        
         );
        
        
                        };
        
        
 export default User_edit;