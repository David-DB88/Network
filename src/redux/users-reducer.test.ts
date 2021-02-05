import usersReducer, {actions, InitialStateType} from "./users-reducer";
let state: InitialStateType
beforeEach(()=>{
  state = {
    users: [{
      id: 0, name: 'Teste 0', followed: false, photos: {large: null, small: null}, status: 'status 0'
    },
      {id: 1, name: 'Teste 1', followed: false, photos: {large: null, small: null}, status: 'status 1'
      },
      {id: 2, name: 'Teste 2', followed: true, photos: {large: null, small: null}, status: 'status 2'
      },
      {id: 3, name: 'Teste 3', followed: true, photos: {small: null, large:  null}, status: 'status 3'
      },
    ],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    fetchingProcessing: []
  }

})

test ("",()=>{

const newState = usersReducer(state, actions.followAccsees(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})


test ("",()=>{

  const newState = usersReducer(state, actions.unfollowAccsees(2))


  expect(newState.users[2].followed).toBeFalsy()
  expect(newState.users[3].followed).toBeTruthy()
})