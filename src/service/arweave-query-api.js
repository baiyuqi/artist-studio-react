export const recipientQuery = (address) => {
    const recipientsQuery = {
      query: `
      query {
        transactions(recipients: ["${address}"]) {
          edges {
            node {
              id
              owner {
                address
              }
              fee {
                winston
                ar
              }
              quantity {
                winston
                ar
              }
              tags {
                name
                value
              }
            }
          }
        }
      }    
  `}
    return recipientsQuery;
  }
  
  export const ownersQuery = (address) => {
    const ownersQuery = {
      query: `
      query {
        transactions(
          owners: ["${address}"],
          tags: {
            name: "Domain-Type",
            values: ["article"]
          }
      ) {
          edges {
            node {
              id
              recipient
              fee {
                ar
              }
              quantity {
                ar
              }
              tags {
                name
                value
              }
            }
          }
        }
      }    
  `}
    return ownersQuery;
  }