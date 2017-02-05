export default function({dispatch}) {
    //logic here is that when action has promise on it we create a new action in step 2 and
    // send it all over cycle again. This new function then comes to step one and is being processed as
    //simple func with no promise
    return next => action => {

        //1. if action does not have payload or .then(meaning it is not a promise) then
        // send this action forward to other middlewares or if there are no other middles wares than to reducer.
        //Here we filter actions that this middleware does not care about
        if (!action.payload || !action.payload.then) {
            return next(action);
        }


        //2. make sure that promise resolves
        action.payload
            .then(function(response) {
                //this creates new action with data from promise
                const newAction = {...action, payload: response}

                //dispatch sends the whole cycle again from very top. The next would just send action to the next middleware or reducer.
                dispatch(newAction)
            })
    }
}
