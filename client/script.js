const form = document.querySelector('#promptform');
const chatContainer = document.querySelector('#chatContainer')



const getRes = async (e) => {
    const prompt = form.elements.prompt.value;

    try {
        const res = await axios.post("https://cors-anywhere.herokuapp.com/http://localhost:3000/", {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: prompt })
        });
        console.log(res)
        return res;
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

