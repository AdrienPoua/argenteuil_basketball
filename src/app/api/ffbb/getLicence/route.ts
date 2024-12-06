import organisme from "@/data/organisme.json"
const idOrganisme = organisme[0].id

const endpoint = `https://ffbbserver3.ffbb.com/ffbbserver3/api/licence/getSimple.ws?idOrganisme=${idOrganisme}`

