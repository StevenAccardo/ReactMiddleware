//this is the basic setup for a middleware

//The top level function will get called with dispatch
export default function({ dispatch }) {
  //returns another function, which then returns another function
  //The second function will usually be past the next keyword
  return next => action => {
    //within the inner-most function is where you will place your middleware logic

    //if action does not have a payload, or the payload does not have .then() property, then this middleware doesn't care about it. Send it on to the next middleware.
    //Every promise has a .then() property, so this is a way for us to tell if the payload contains a promise, or not.
    if (!action.payload || !action.payload.then) {
      //The next keyword means, send this action on to the next middleware in the stack, or to the reducer if there is no other middlewares
      return next(action);
    }

    //Make sure the action's promise resolves

    //Any function that we pass to .then() is always going to be called after the promise resolves
    //Once resolved the function within the .then() method will have access to the resolved response from the API
    action.payload.then(function(response) {
      //uses rest operator to grab anyting that was in the origianl action, and then overwrites the original payload property, which was an action, with a new payload property'
      //this creates a new action for us to send back through the middleware stack with a new payload
      const newAction = { ...action, payload: response };
      //dispatch takes this new action and sends it through to the very top of the middleware stack
      dispatch(newAction);
    });
  };
}
