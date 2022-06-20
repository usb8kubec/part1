const getHashNow = () => {
  const now = new Date().toString()
  const randomHash = Math.random().toString(36).substr(2, 6)

  console.log(new Date().toString(), ': ', randomHash)

  setTimeout(getHashNow, 5000)
}

getHashNow()