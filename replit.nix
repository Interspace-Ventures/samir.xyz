{pkgs}: {
  deps = [
    pkgs.nodejs
    pkgs.jq
    pkgs.wget
    pkgs.netcat
    pkgs.lsof
  ];
}
