// USE TO TEST GIT

const form = document.querySelector('#promptform');
const chatContainer = document.querySelector('#chatContainer')



const getRes = async (e) => {
    const prompt = form.elements.prompt.value;

    try {
        const res = await fetch("http://localhost:3000", {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });
        if (res.statusText === "Unauthorized") {
            const text = "I am sorry this API is Unavaliable right now and you need to make a payment in order to deal with the issue: " + res.statusText;
            return text;
        } else return res.body.data.output;
    } catch (e) {
        return e;
    }

}

const handleSubmit = async (e) => {
    e.preventDefault();
    const respText = await getRes();
    const newP = document.createElement("p");
    chatContainer.innerHTML += '<h3>Here is your response:</h3>';
    newP.append(respText);
    chatContainer.append(newP);
    form.elements.prompt.value = '';
}



form.addEventListener('submit', handleSubmit)

