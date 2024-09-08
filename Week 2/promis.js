function setTimeoutPromised(delay){
    return new Promise(resolve => setTimeout(resolve, delay));
}

function callback(){
    console.log('Done!!')
}


setTimeoutPromised(1000).then(callback)