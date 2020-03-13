$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message__box" data-message-id="${message.id}">
        <div class="message__box__info">
          <div class="message__box__info__talker">
            ${message.user_name}
          </div>
          <div class="message__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__box__text">
          <p class="message__box__content">
            ${message.content}
          </p>
          <img src=${message.image} " class="lower-message__image">
        </div>
      </div>`

    } else if (message.content) {
      var html = `<div class="message__box" data-message-id="${message.id}">
        <div class="message__box__info">
          <div class="message__box__info__talker">
            ${message.user_name}
          </div>
          <div class="message__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__box__text">
          <p class="message__box__content">
            ${message.content}
          </p>
        </div>
      </div>`

    } else if (message.image) {
      var html = `<div class="message__box" data-message-id="${message.id}">
        <div class="message__box__info">
          <div class="message__box__info__talker">
            ${message.user_name}
          </div>
          <div class="message__box__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__box__text">
          <img src=${message.image} " class="lower-message__image">
        </div>
      </div>`
    };
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData (this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('form')[0].reset();
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.message__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.message').append(insertHTML);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
