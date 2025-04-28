import { ActionsSubjectAbility } from "./ability"

export type UserType = 'admin' | 'user'

export const getAbilitiesByUser = (user: UserType) => {
    const abilities: Record<UserType, ActionsSubjectAbility[]> = {
        user: [{action: 'update', subject: 'task'}],
        admin: [
            {action: 'create', subject: 'task'},
            {action: 'update', subject: 'task'},
            {action: 'delete', subject: 'task'}
        ],
    }

    return abilities[user]
}