import { Http, Headers, RequestOptions } from '@angular/http'
import { Component, OnInit } from '@angular/core'
import { Challenge, User } from '../data'

@Component({
  providers: [Http]
})
export class FeedService {

  // get latest posts
  getLatestPosts(response: (data: Challenge[])=>void) {
    var post = {
      id: "id-1",
      title: "Who's next",
      content: `Cho bàn cờ vua 8x8, có 4 con mã.<br /> 
        Quân trắng đi trước.<br />
        Cho biết vị trí hiện tại của 4 con mã theo format như sau: a7;b8;c7;d8.<br />
        2 ô đầu tiên là vị trí của con mã quân trắng.<br />
        2 ô tiếp theo là của quân đen.<br />
        Tìm lượt đi của người tiếp theo. <br />
        Trả về true nếu là quân trắng.`,
      likes: [ 
          {
            id: "banhtieu", 
            fullName: "Trần Thiện Khiêm",
            profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
          }],
      author: {
        id: "banhtieu", 
        fullName: "Trần Thiện Khiêm",
        profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
      },
      replies: [
        {
          answer: `Something fun here`,
          author: {
            id: "banhtieu", 
            fullName: "Trần Thiện Khiêm",
            profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
          },
          likes: [],
          passedTests: 5 
        },
        {
          answer: `Something fun here`,
          author: {
            id: "banhtieu", 
            fullName: "Trần Thiện Khiêm",
            profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
          },
          likes: [ {
              id: "banhtieu", 
              fullName: "Trần Thiện Khiêm",
              profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
            },
             {
              id: "banhtieu", 
              fullName: "Lê Thị Phương",
              profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
            },
             {
                id: "banhtieu", 
                fullName: "Trần Thiện Khiêm",
                profilePicture: "http://graph.facebook.com/718933983/picture?type=square"
              }
          ],
          passedTests: 5 
        }
      ],
      testsCount: 5,
      createAt: new Date(),
    }

    var posts = [post, post, post, post, post]

    response(posts)
  }

}