const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");
const threadSectionDOM = document.querySelector(".thread-section");

let inputText = "";
let contentText = "";

// GET
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads");
    let {data} = allThreads;
    allThreads = data.map((thread) => {
      const {title, content} = thread;
      return `
      <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
      `;
    }).join("");
    threadSectionDOM.innerHTML = allThreads;
  } catch(e) {
    console.log(e);
  }
}

getAllThreads();

// POST
inputTextDOM.addEventListener("change", (e) => {
  inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
  contentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (inputText && contentText) {
    try {
      await axios.post("/api/v1/thread", {
        title: inputText,
        content: contentText
      });
      getAllThreads();
    } catch(e) {
      console.log(e);
    }

    inputText = "";
    contentText = "";
    inputTextDOM.value = "";
    inputContentDOM.value = "";
  } else {
    console.log("error");
  }
});
