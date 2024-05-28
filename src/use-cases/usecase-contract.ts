/* eslint-disable @typescript-eslint/no-unused-vars */

interface UseCase<UserCaseRequest, UserCaseResponse> {
  execute(request: UserCaseRequest): Promise<UserCaseResponse>
}
