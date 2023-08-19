import { auth, onAuthStateChanged, signOut, doc, db, getDoc, collection, addDoc, setDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy, storage, ref, uploadBytesResumable, getDownloadURL } from "./firebaseConfig.js"
let activeUser;
function del(elem) {
  const post = elem.parentNode.parentNode
  const delBtn = document.getElementById("delBtn")
  delBtn.addEventListener("click", async () => {
    await deleteDoc(doc(db, "posts", post.id));
    post.remove()
    document.getElementById("delClose").click()
  })

}
window.del = del
const postCard = (time, firstName, lastName, text, title, uId) => {
  let date = new Date(time.seconds * 1000).toLocaleString()
  return `<div id="${uId}" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; width: 50%;" class="p-3 ms-3 mb-3">
    <div style=" width: 100%;"  >
      <div class="authorsDetails d-flex align-items-center">
        <div class="post-header-container d-flex align-items-center">
          <div style="width:100px; height: 100px;" class="rounded">
            <img 
              src="https://images.unsplash.com/photo-1682687220777-2c60708d6889?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="" class="img-fluid" style="width: 100%;height: 100%; object-fit: cover ;">
          </div>
          <div class="userName-id ms-3 w-100 border-1">
            <h6 style="font-size: 16px;" class=" userTag postTitle">${title}</h5>
              <p style="font-size: 12px;"> ${firstName} ${lastName} ${date}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div class="main-paragraph" >
        <p class="mb-3 ms-2 m-3 blogText" style="font-size: 16px; width:100%; word-wrap: break-word;">${text}</p>
          <button data-bs-toggle="modal" data-bs-target="#delModal" style="width: 100px;" class="btn  btn-primary" onclick="del(this)">Delete</button>
          <button data-bs-toggle="modal" data-bs-target="#editModal" style="width: 100px;"class="btn  btn-primary" onclick="edt(this)">Edit</button>
        </div>
      </div>
    </div>
  </div>`
}

window.addEventListener("load", function () {
  const user = JSON.parse(localStorage.getItem("user"))
  // if(!user){
  //   window.location.replace("./index.html")
  //   return
  // }
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "users", uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        activeUser = docSnap.data()

        document.getElementById("name").innerHTML = `${activeUser.firstName} ${activeUser.lastName}`

        const q = query(collection(db, "posts"), orderBy("time"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const { time, firstName, lastName, text, title, uId } = doc.data()
          const card = postCard(time, firstName, lastName, text, title, doc.id)
          postBox.innerHTML = card + postBox.innerHTML
        });

      } else {
        alert("No such document!");
      }
    } else {
      window.location.replace("./index.html")
      return
    }
  });

})

const post = document.getElementById("post")
post.addEventListener("click", async () => {

  try {
    post.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>`
    post.style.pointerEvents = "none"
    post.style.opacity = "0.5"
    let placeholder = document.getElementById("title")
    let blogText = document.getElementById("textfilled")
    if (!placeholder.value || !blogText.value) {
      Swal.fire({
        title: 'Fill All The Fields',
        icon: 'warning',
        confirmButtonColor: 'rgb(119, 73, 248)',
        iconColor: 'rgb(119, 73, 248)'
      })
      post.innerHTML = `Publish Blog`
      post.style.pointerEvents = "auto"
      post.style.opacity = "1"
      return
    }


    const obj = {
      time: serverTimestamp(),
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      title: placeholder.value,
      text: blogText.value,
      uId: activeUser.uid
    }

    const docRef = await addDoc(collection(db, "posts"), obj);
    const getDocRef = doc(db, "posts", docRef.id);
    const docSnap = await getDoc(getDocRef);
    const { time, firstName, lastName, text, title, uId } = docSnap.data();
    const postBox = document.getElementById("postBox")
    const card = postCard(time, firstName, lastName, text, title, docSnap.id)
    postBox.innerHTML += card
    post.innerHTML = `Publish Blog`
    post.style.pointerEvents = "auto"
    post.style.opacity = "1"
  } catch (e) {
    alert(e.message)
  }
})

async function edt(elem) {
  const uptTitle = document.getElementById("uptTitle")
  const uptDescription = document.getElementById("uptDescription")
  const post = elem.parentNode.parentNode
  post.querySelector(".postTitle")
  post.querySelector(".blogText")
  uptTitle.value = post.querySelector(".postTitle").innerHTML
  uptDescription.value = post.querySelector(".blogText").innerHTML
  const uptBtn = document.getElementById("updateBtn").addEventListener("click", async () => {
    console.log(post.id);
    const washingtonRef = doc(db, "posts", post.id);
    await updateDoc(washingtonRef, {
      title: uptTitle.value,
      text: uptDescription.value,
    });
    post.querySelector(".postTitle").innerHTML = uptTitle.value
    post.querySelector(".blogText").innerHTML = uptDescription.value
  })
}
window.edt = edt
