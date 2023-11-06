import {UpdateTaskModelType} from '../../../../../../../common/api';
import {UpdateTaskModelDomainType} from '../../../../../model/tasks/tasks-reducer';

export const getModel=(task:UpdateTaskModelType, domainModel:UpdateTaskModelDomainType): UpdateTaskModelType=>{
 return  {
    title: task.title,
      description: task.description,
    startDate: task.startDate,
    deadline: task.deadline,
    priority: task.priority,
    status: task.status,
  ...domainModel
  }
}