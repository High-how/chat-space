$(function(){
  var last_message_id = $('.message__box:last').data("message-id");
  console.log (last_message_id);

  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="message__box">
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
        <img src=${message.image} >
      </div>`
      return html
    } else {
      var html = 
      `<div class="message__box">
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
      return html;
    };
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
});
