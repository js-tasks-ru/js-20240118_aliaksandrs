export default class NotificationMessage {
  static notificationMessage;
  message;
  type;
  duration;
  element;

  constructor(message='', {type = 'success', duration = 1000} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.renderElement();
  }

  renderElement() {
    const element = document.createElement("notification_success");
    element.innerHTML = this.template();
    return element.firstChild;
  }

  template() {
    return `<div class="notification ${this.type}" style="--value:20s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`
  }

  destroy() {
    this.element = null;
    NotificationMessage.notificationMessage = null;
  }

  remove() {
    this.element.remove();
  }

  show(container = document.body) {
    if (NotificationMessage.notificationMessage) {
      NotificationMessage.notificationMessage.destroy();
    }
    container.appendChild(this.element);

    NotificationMessage.notificationMessage = this;
    setTimeout(()=>{this.remove()}, this.duration);
  }
}
