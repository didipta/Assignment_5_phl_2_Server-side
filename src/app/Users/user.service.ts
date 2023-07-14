
import { IPaginationOptions } from '../../shared/Ipagination';
import { IGenericResponse } from '../../shared/common';
import { paginationHelpers } from '../../shared/paginationHelper';
import { IUser } from './User.interface';
import { User } from './User.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

const getAlluser = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await User.find({}).skip(skip).limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleuser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateuser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteuser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getSingleuser,
  updateuser,
  deleteuser,
  getAlluser,
};
