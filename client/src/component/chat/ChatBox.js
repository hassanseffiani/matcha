import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Input, Grid, List, Chip } from "@material-ui/core";
import SocketContext from "../../start/SocketContext";
import Axios from "axios";
import "./ChatBox.js";

const useStyles = makeStyles((theme) => ({
  chatBox: {
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  messages: {
    padding: "14px",
  },
  textInput: {
    position: "absolute",
    bottom: 0,
    color: "purple",
    width: "100%",
  },
  right: {
    wordBreak: "break-all",
    padding: "10px",
  },
  left: {
    wordBreak: "break-all",
    padding: "10px",
  },
  myText: {
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "#e6b4e4",
    padding: "10px",
    float: "right",
  },
  hisText: {
    color: "white",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "#000000a8",
    padding: "10px",
  }
}));
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const ChatBox = (props) => {
  const [conversation, setCoversation] = React.useState([]);
  const classes = useStyles();
  const [didMount, setDidMount] = React.useState(false)

  const socket = React.useContext(SocketContext);

  const func = React.useCallback(async () => {
    if (!isEmpty(props.hisInfos)) {
      await Axios.post("http://localhost:3001/chat/getConversation", {
        user1: props.id,
        user2: props.hisInfos.id,
      })
        .then((res) => {
          if (res.data.response.length !== 0) {
            setCoversation(res.data.response);
          }
          if (res.data.response === "") {
            setCoversation([]);
          }
        })
        .catch((err) => {
        });
    }
  }, [props]);

  React.useEffect(() => {
    func()
  }, [func])

  const updateScroll = () => {
    var element = document.getElementById("t")
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (props.hisInfos) {
      var input = document.getElementById("msg");
      if (e.keyCode === 13 && input.value) {

        saveMessage(input.value);
        Axios.post("http://localhost:3001/notifications/saveNotifications", {
          who: props.id,
          target: props.hisInfos.id,
          type: "message",
        });
        socket.emit("msg", {
          text: input.value,
          from: props.myInfos.id,
          to: props.hisInfos.id,
        });
        input.value = "";
      }
    }
  };

  React.useEffect(() => {
    socket.on("new_msg", (data) => {
      setCoversation((conversation) => [
        ...conversation,
        {
          id: conversation.length
            ? conversation[conversation.length - 1].id + 1
            : 1,
          id_from: data.from,
          id_to: data.to,
          content: data.msg,
        },
      ]);
    });
    setDidMount(true)
    return () => setDidMount(false);
  }, [socket]);

  const saveMessage = (content) => {
    Axios.post("http://localhost:3001/chat/saveMessage", {
      from: props.id,
      to: props.hisInfos.id,
      content: content,
    })
      .then((res) => {
        setCoversation((conversation) => [
          ...conversation,
          {
            id: conversation.length
              ? conversation[conversation.length - 1].id + 1
              : 1,
            id_from: props.id,
            id_to: props.hisInfos.id,
            content: content,
          },
        ]);
      updateScroll();

      })
      .catch((err) => {
      });
  };


  if (!didMount)
    return null

  if (!isEmpty(props.hisInfos)) {
    return (
      <div className={classes.chatBox}>
        <Grid container direction="column" spacing={2} className="messages">
          <List id="t" style={{ maxHeight: 300, overflow: "auto" }}>
            {conversation.length !== 0 &&
              conversation.map((element, iKey) => {
                if (element.id_from === props.myInfos.id) {
                  return (
                    //hnaya1
                    <Grid item container className={classes.me} key={iKey}>
                      <Grid item sm={4}></Grid>
                      <Grid item sm={8} className={classes.right}>
                        <Chip
                          className={classes.myText}
                          variant="outlined"
                          size="small"
                          label={element.content}
                        />
                      </Grid>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item container className={classes.him} key={iKey}>
                      <Grid item sm={8} className={classes.left}>
                        <Chip
                          className={classes.hisText}
                          variant="outlined"
                          size="small"
                          label={element.content}
                        />
                      </Grid>
                      <Grid item sm={4}></Grid>
                    </Grid>
                  );
                }
              })}
            {!conversation.length && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Say hello ...
              </Typography>
            )}
          </List>
        </Grid>
        <Input
          id="msg"
          type="text"
          className={classes.textInput}
          placeholder="Message"
          onKeyUp={sendMessage}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.chatBox}>
        <Typography variant="body2" color="textSecondary" component="p">
          &nbsp;&nbsp;&nbsp;&nbsp;select the user you want to chat with
        </Typography>
      </div>
    );
  }
};

export default ChatBox;
