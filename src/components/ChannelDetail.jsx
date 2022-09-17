import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI.JS";
import zIndex from "@mui/material/styles/zIndex";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videosDetail, setVideosDetail] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part="snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId?=${id}&part=snippet&order=date`).then(
      (data) => setVideosDetail(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 89%, rgba(255,0,0,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard ChannelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videosDetail} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
