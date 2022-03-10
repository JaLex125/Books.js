function collapse(){
    var x = document.getElementById("sidebar");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

let wishlistcount = 0

function fillBooks(books) {
    const list = document.getElementById("list")
    for(idx in books ) {
        const li = document.createElement("li")

        const DOM_image = document.createElement("img")
        DOM_image.src = books[idx].image
        
        const DOM_title = document.createElement("p")
        DOM_title.innerText = books[idx].title

        const DOM_author = document.createElement("p")
        DOM_author.innerText = books[idx].authors

        
        const DOM_rating = document.createElement("span")
        DOM_rating.classList.add("fa", "fa-star", "checked")

        const DOM_numberrating = document.createElement("p")
        DOM_numberrating.innerText = books[idx].numberrating

        li.appendChild(DOM_image)
        li.appendChild(DOM_title)
        li.appendChild(DOM_author)
        li.appendChild(DOM_numberrating)

        for (let i = 0; i < books[idx].rating; i++) {
        const DOM_rating = document.createElement("span")
        DOM_rating.classList.add("fa", "fa-star", "checked")
        li.appendChild(DOM_rating)
        }

        li.classList.add("bookcard")
        var Wishlist = document.getElementById("Wishlist")
        var DOM_Wishlist = document.createElement("li")
        const WishButton = document.createElement("button")
        WishButton.innerHTML = "Button"
        WishButton.type = "Button"
        WishButton.innerText = "Add to Wishlist"
        WishButton.classList.add ("WishBtn")
        WishButton.onclick = function() {
        if (this.innerText=="Add to Wishlist") {
            this.innerText = "Remove from Wishlist";
            
            var a = document.getElementById("Wishlist");
            var li = document.createElement("li");
            li.setAttribute('id', this.parentElement.children[1].innerText);
            li.appendChild(document.createTextNode(this.parentElement.children[1].innerText));
            a.appendChild(li);
        }
        else {
            this.innerText = "Add to Wishlist";
            var a = document.getElementById("Wishlist");
            var item = document.getElementById(this.parentElement.children[1].innerText);
            a.removeChild(item);
        } 
        }
        li.append(WishButton)
        list.append(li)
    }
}

function loadAndFillBooks(search) {
    const query = search != undefined?`?search=${search}`:""

    fetch(`./books.json${query}`)
    .then(data => data.json())
    .then(books => { fillBooks(books) })
}

function search() {
    // Declare variables
    var input, filter, ul, li, p, i, txtValue;
    input = document.getElementById('query');
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName('li');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      p = li[i].getElementsByTagName("p")[0];
      txtValue = p.textContent || p.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

window.onload = () => {
    loadAndFillBooks() // If no parameter is given, search is undefined

    installOtherEventHandlers()
}



