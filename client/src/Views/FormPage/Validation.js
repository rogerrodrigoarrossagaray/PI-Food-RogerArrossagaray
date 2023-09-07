export default function validation(state){
    const error ={}
if(!state.title){
    error.title="Title is required"
}
if(!state.summary || state.summary.length < 20){
    error.summary ="Summary must be at least 20 characters long."
}
if(state.instructionsList.length < 3 || !state.instructionsList){
    error.instructions= "You need to add instructions"
}
if(state.diets.length < 1){
    error.diet="Select a diet option."
}
return error;
};