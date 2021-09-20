
module.exports = {
  title: "Missing Paradox Space Comics", 
  author: "GiovanH & Homestuck.net",
  modVersion: 0.1,

  trees: {
    './': 'assets://archive/comics/pxs/ex/',
  },

  edit(archive) {
    archive.comics.pxs.list.push('shop-til-you-drop')
    archive.comics.pxs.list.push('the-morel-of-the-story')
    archive.comics.pxs.list.push('foreword')
    archive.comics.pxs.list.push('book1-sketchbook')
    archive.comics.pxs.list.push('2foreword')
    archive.comics.pxs.list.push('book2-sketchbook')
    archive.comics.pxs.list.push('404')
    // archive.comics.pxs.list.push('vrisky-business')

    archive.comics.pxs.comics['shop-til-you-drop'] = {
      "name": "Shop Til You Drop",
      "credit": "Story by P Gibson, Art by Jon Griffiths",
      "pages": [
        "assets://archive/comics/pxs/ex/shop-til-you-drop-1.jpg",
        "assets://archive/comics/pxs/ex/shop-til-you-drop-2.jpg",
        "assets://archive/comics/pxs/ex/shop-til-you-drop-3.jpg",
        "assets://archive/comics/pxs/ex/shop-til-you-drop-4.jpg"
      ]
    }
    archive.comics.pxs.comics['the-morel-of-the-story'] = {
      "name": "The Morel of the Story",
      "credit": "Story and Art by P. Gibson",
      "pages": [
        "assets://archive/comics/pxs/ex/the-morel-of-the-story-1.jpg",
        "assets://archive/comics/pxs/ex/the-morel-of-the-story-2.jpg",
        "assets://archive/comics/pxs/ex/the-morel-of-the-story-3.jpg"
      ]
    }
    archive.comics.pxs.comics['foreword'] = {
      "name": "Book 1 foreword",
      "credit": "Story and Art by Jon Griffiths",
      "pages": [
        "assets://archive/comics/pxs/ex/foreword-1.png",
        "assets://archive/comics/pxs/ex/foreword-2.jpg",
      ]
    }
    archive.comics.pxs.comics['fiduspawn'] = {
      "name": "Fiduspawn",
      "credit": "Story by Mary Borsellino, Art by incineraptor",
      "pages": [
        "assets://archive/comics/pxs/ex/fiduspawn-1.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-2.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-3.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-4.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-5.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-6.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-7.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-8.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-9.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-10.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-11.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-12.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-13.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-14.jpg",
        "assets://archive/comics/pxs/ex/fiduspawn-15.jpg"
      ]
    }
    archive.comics.pxs.comics['2foreword'] = {
      "name": "Book 2 Foreword",
      "credit": "Story and Art by Jon Griffiths",
      "pages": [
        "assets://archive/comics/pxs/ex/2foreword-1.jpg",
        "assets://archive/comics/pxs/ex/2foreword-2.jpg",
        "assets://archive/comics/pxs/ex/2foreword-3.jpg",
        "assets://archive/comics/pxs/ex/2foreword-4.jpg"
      ]
    }
    archive.comics.pxs.comics['book1-sketchbook'] = {
      "name": "Book 1 Sketchbook",
      "credit": "",
      "pages": [
        "assets://archive/comics/pxs/ex/book1-sketchbook-1.jpg",
        "assets://archive/comics/pxs/ex/book1-sketchbook-2.png",
        "assets://archive/comics/pxs/ex/book1-sketchbook-3.jpg",
        "assets://archive/comics/pxs/ex/book1-sketchbook-4.jpg",
        "assets://archive/comics/pxs/ex/book1-sketchbook-5.jpg",
        "assets://archive/comics/pxs/ex/book1-sketchbook-6.png",
        "assets://archive/comics/pxs/ex/book1-sketchbook-7.jpg",
        "assets://archive/comics/pxs/ex/",
        "assets://archive/comics/pxs/ex/",
        "assets://archive/comics/pxs/ex/"
      ]
    }
    archive.comics.pxs.comics['book2-sketchbook'] = {
      "name": "Book 2 Sketchbook",
      "credit": "",
      "pages": [
        "assets://archive/comics/pxs/ex/book2-sketchbook-1.png",
        "assets://archive/comics/pxs/ex/book2-sketchbook-2.jpg",
        "assets://archive/comics/pxs/ex/book2-sketchbook-3.jpg",
        "assets://archive/comics/pxs/ex/book2-sketchbook-4.jpg",
        "assets://archive/comics/pxs/ex/book2-sketchbook-5.jpg",
        "assets://archive/comics/pxs/ex/book2-sketchbook-6.jpg",
        "assets://archive/comics/pxs/ex/book2-sketchbook-7.jpg"
      ]
    }

    archive.comics.pxs.comics['404'] = {
      "name": "404",
      "credit": "Randomized 404 pages, mostly by KC Green",
      "pages": [
        "/archive/comics/pxs/404.png",
        "/archive/comics/pxs/404-1.png",
        "/archive/comics/pxs/404-2.png",
        "/archive/comics/pxs/404-3.png",
        "/archive/comics/pxs/404-4.png",
        "/archive/comics/pxs/sitedown.png"
      ]
    }
  }
}