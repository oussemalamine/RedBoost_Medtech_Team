// notificationTemplates.js

const NotificationTemplates = {
  taskAssigned: {
    title: (taskName) => `New Task Assigned: ${taskName}`,
    text: (taskName, dueDate) => {
      const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return `You have been assigned a new task: ${taskName}. Due date: ${formattedDueDate}.`;
    },
  },
  taskStatusChanged: {
    completed: {
      title: (taskName) => `Task Completed: ${taskName}`,
      text: (taskName) => `The task "${taskName}" has been marked as completed.`,
    },
    inProgress: {
      title: (taskName) => `Task In Progress: ${taskName}`,
      text: (taskName) => `The task "${taskName}" is now in progress.`,
    },
    notStarted: {
      title: (taskName) => `Task Not Started: ${taskName}`,
      text: (taskName) => `The task "${taskName}" has not started yet.`,
    },
    cancelled: {
      title: (taskName) => `Task Cancelled: ${taskName}`,
      text: (taskName) => `The task "${taskName}" has been cancelled.`,
    },
    expired: {
      title: (taskName) => `Task Expired: ${taskName}`,
      text: (taskName) => `The task "${taskName}" has expired.`,
    },
    valid: {
      title: (taskName) => `Task Validated: ${taskName}`,
      text: (taskName) => `The task "${taskName}" has been validated.`,
    },
  },
};

module.exports = NotificationTemplates;
