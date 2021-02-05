import {actions, follow, unfollow} from "./users-reducer";
import {usersAPI} from '../API/users-api'
import {ApiResponseType, ResultCodeEnum} from "../API/Api";

jest.mock('../API/users-api')
const userApiMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: ApiResponseType ={
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

userApiMock.getFollow.mockReturnValue(Promise.resolve(result));
userApiMock.getUnFollow.mockReturnValue(Promise.resolve(result));


const dispatchMock = jest.fn();
const getStateMock = jest.fn()
beforeEach(()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userApiMock.getFollow.mockClear()
    userApiMock.getUnFollow.mockClear()
})


test('success follow thunk', async ()=>{
    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.togglFetchingProcessing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followAccsees(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.togglFetchingProcessing(false, 1))
})
test('success unfollow thunk', async ()=>{
    const thunk = unfollow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.togglFetchingProcessing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowAccsees(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.togglFetchingProcessing(false, 1))
})
