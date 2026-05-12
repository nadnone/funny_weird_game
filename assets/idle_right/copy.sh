for i in {0..72}; do
    cp ./image0000".png" "./image"$(printf "%04d" $i)".png"
done
