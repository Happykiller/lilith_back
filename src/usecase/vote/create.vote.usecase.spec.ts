// src\usecase\vote\create.vote.usecase.spec.ts
import { CreateVoteUsecase } from '@usecase/vote/create.vote.usecase';
import { VoteUsecaseModel } from '@usecase/vote/model/vote.usecase.model';
import { CreateVoteUsecaseDto } from '@usecase/vote/dto/create.vote.usecase.dto';

describe('CreateVoteUsecase', () => {
  let usecase: CreateVoteUsecase;
  const mockGameRepository = {
    createVote: jest.fn(),
  };

  const mockInversify = {
    gameRepository: mockGameRepository,
  } as any;

  beforeEach(() => {
    usecase = new CreateVoteUsecase(mockInversify);
    jest.clearAllMocks();
  });

  it('should create a vote and return the result', async () => {
    // Arrange
    const dto: CreateVoteUsecaseDto = {
      game_id: 'game123',
      item_id: 'item42',
      user_id: 'user456',
      vote: 'yes',
    };

    const mockVote: VoteUsecaseModel = {
      id: 'vote789',
      game_id: dto.game_id,
      item_id: dto.item_id,
      author_id: dto.user_id,
      vote: dto.vote,
      enable: true
    };

    mockGameRepository.createVote.mockResolvedValueOnce(mockVote);

    // Act
    const result = await usecase.execute(dto);

    // Assert
    expect(mockGameRepository.createVote).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockVote);
  });
});
