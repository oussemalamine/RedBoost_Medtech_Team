// notificationService.js

import NotificationTemplates from './NotificationTemplates';

const createNotification = (type, task, user) => {
  let title, text;

  switch (type) {
    case 'taskAssigned':
      title = NotificationTemplates.taskAssigned.title(task.taskName);
      text = NotificationTemplates.taskAssigned.text(task.taskName, task.dueDate);
      break;
    case 'taskStatusChanged':
      if (NotificationTemplates.taskStatusChanged[task.status]) {
        title = NotificationTemplates.taskStatusChanged[task.status].title(task.taskName);
        text = NotificationTemplates.taskStatusChanged[task.status].text(task.taskName);
      }
      break;
    default:
      throw new Error(`Unknown notification type: ${type}`);
  }

  return {
    userId: user._id,
    taskId: task._id,
    title,
    text,
    creationTime: new Date(),
    read: false,
  };
};

export default createNotification;
