for i in {0..20}; do
    cp ./image0000".png" "./image"$(printf "%04d" $i)".png"
done