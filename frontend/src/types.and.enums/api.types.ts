export type billRequestData = {
    cardId: string,
    statementDate: Date,
    dueDate: Date,
    minimumDue: number,
    totalDue: number,
    description?: string,
}

export type creditCardRequestData = {
    name: string,
    type: string,
    creditLimit: number,
}

export type paymentRequestData = {
    cardId: string,
    amount: number,
    date: Date,
    description?: string,
}